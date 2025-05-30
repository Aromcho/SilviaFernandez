import Property from '../models/Property.model.js';
import PropertyManager from '../manager/property.manager.js';
import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';


// Obtener la latitud y longitud de todas las propiedades
const getPropertyLocations = async (req, res) => {
  try {
    const properties = await Property.find(
      { geo_lat: { $ne: null }, geo_long: { $ne: null } }, // Solo propiedades con coordenadas
      { id: 1, address: 1, geo_lat: 1, geo_long: 1, publication_title: 1 } // Solo los datos necesarios
    ).lean();

    if (!properties.length) {
      return res.status(404).json({ message: "No se encontraron propiedades con ubicación" });
    }

    const formattedProperties = properties.map((property) => ({
      id: property.id ? property.id.toString() : "sin-id", // Convertimos el ID a string para evitar errores de tipo
      name: property.publication_title || "Propiedad sin título",
      address: property.address || "Dirección no disponible",
      loc: {
        lat: property.geo_lat,
        lon: property.geo_long,
      },
    }));

    res.status(200).json(formattedProperties);
  } catch (error) {
    console.error("Error al obtener las ubicaciones de propiedades:", error);
    res.status(500).json({ message: "Error al obtener ubicaciones", error });
  }
};

// Crear una nueva propiedad

const createProperty = async (req, res) => {
  try {
    // Obtener los datos enviados en el cuerpo de la solicitud
    const { body } = req.body;

    // Validar datos básicos antes de guardar (puedes ampliar esta validación)
    if (!body.id || !body.address || !body.operations || !Array.isArray(body.operations)) {
      return res.status(400).json({ message: 'Datos incompletos. Se requiere al menos: id, address y operations.' });
    }

    // Crear una nueva instancia de la propiedad
    const newProperty = new Property(body);

    // Guardar la propiedad en la base de datos
    await newProperty.save();

    // Responder con el objeto creado
    res.status(201).json({
      message: 'Propiedad creada exitosamente',
      property: newProperty,
    });
  } catch (error) {
    console.error('Error al crear la propiedad:', error);

    // Manejo de errores específicos, como duplicados
    if (error.code === 11000) {
      return res.status(409).json({ message: 'La propiedad ya existe', error });
    }

    res.status(500).json({ message: 'Error al crear la propiedad', error });
  }
};
// Buscar propiedad por ID
const getpropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    // Convertir el id a número (si es necesario)
    const numericId = parseInt(id, 10);

    // Buscar la propiedad por el campo `id` (en lugar de `_id`) y usar lean() para optimizar
    const property = await property.findOne({ id: numericId }).lean(); // Usamos .lean()

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ message: 'Error al obtener la propiedad' });
  }
};

const getProperties = async (req, res) => {
  try {
    const {
      operation_type,
      property_type,
      minRooms,
      maxRooms,
      minPrice,
      maxPrice,
      barrio,
      searchQuery,
      minGarages,
      maxGarages,
      limit = 10,
      offset = 0,
      order = 'DESC',
      is_starred,
    } = req.query;

    // Crear un objeto con los filtros a aplicar
    const filterObj = {};

    // Filtro por tipo de operación
    if (operation_type && operation_type.length > 0) {
      const ops = Array.isArray(operation_type) ? operation_type : [operation_type];
      filterObj['operations.operation_type'] = { $in: ops };
    }

    // Filtro por tipo de propiedad
    if (property_type && property_type !== '-1') {
      filterObj['type.name'] = { $in: property_type };
    }

    // Filtro por cantidad de habitaciones
    if (minRooms || maxRooms) {
      filterObj['suite_amount'] = {};
      if (minRooms) {
        filterObj['suite_amount'].$gte = parseInt(minRooms);
      }
      if (maxRooms) {
        filterObj['suite_amount'].$lte = parseInt(maxRooms);
      }
    }

    // Filtro por rango de precios
    if (minPrice || maxPrice) {
      filterObj['operations.prices.price'] = {};
      if (minPrice) {
        filterObj['operations.prices.price'].$gte = parseInt(minPrice);
      }
      if (maxPrice) {
        filterObj['operations.prices.price'].$lte = parseInt(maxPrice);
      }
    }

    // Filtro por barrio
    if (barrio && barrio.length > 0) {
      filterObj['location.name'] = { $regex: barrio, $options: 'i' };
    }

    // Filtro de búsqueda general
    if (searchQuery && searchQuery.length > 0) {
      filterObj.$or = [
        { address: { $regex: searchQuery, $options: 'i' } },
        { 'location.full_location': { $regex: searchQuery, $options: 'i' } },
        { 'location.name': { $regex: searchQuery, $options: 'i' } },
        { publication_title: { $regex: searchQuery, $options: 'i' } },
        { real_address: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    // Filtro por cocheras (garages)
    if (minGarages || maxGarages) {
      filterObj['parking_lot_amount'] = {};
      if (minGarages) {
        filterObj['parking_lot_amount'].$gte = parseInt(minGarages);
      }
      if (maxGarages) {
        filterObj['parking_lot_amount'].$lte = parseInt(maxGarages);
      }
    }

    // Filtro por "destacados"
    if (is_starred === 'true') {
      filterObj.is_starred_on_web = true;
    }

    // Orden compuesto (multi-sort):
    // 1) created_at DESC para que salgan primero las más nuevas
    // 2) Luego, se ordena por precio asc o desc según "order"
    const sortObj = {
      'operations.prices.price': order.toLowerCase() === 'desc' ? -1 : 1,
    };

    const properties = await PropertyManager.paginate({
      filter: filterObj,
      opts: {
        sort: sortObj,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
      },
      projection: 'id address suite_amount operations.prices location.name created_at',
      lean: true,
    });

    const total_count = properties.totalDocs;

    res.json({
      meta: {
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        total_count,
      },
      objects: properties.docs,
    });
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    res.status(500).json({ message: 'Error al obtener propiedades', error });
  }
};



const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Asumiendo que "id" es un campo en el documento que no es el ObjectId de MongoDB
    const property = await PropertyManager.readByCustomId(id); // Usamos el método que busca por 'id'

    if (!property) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    res.json(property);
  } catch (error) {
    console.error('Error al obtener la propiedad:', error);
    res.status(500).json({ message: 'Error al obtener la propiedad' });
  }
};


const getRelatedProperties = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, location, propertyType } = req.query;

    // 1. Buscar la propiedad de referencia usando el campo 'id' (no '_id')
    const currentProperty = await Property.findOne({ id: parseInt(id) }).lean();
    if (!currentProperty) {
      return res.status(404).json({ message: 'Propiedad no encontrada' });
    }

    const currentPrice = currentProperty.operations[0].prices[0].price;
    const currentLocation = currentProperty.location.name;
    const currentType = currentProperty.type.name;

    // 2. Configurar un margen de tolerancia para los precios (por ejemplo, ± 20%)
    const priceTolerance = 0.2; // 20% de margen
    const minPrice = currentPrice * (1 - priceTolerance);
    const maxPrice = currentPrice * (1 + priceTolerance);

    // 3. Intentar encontrar propiedades que coincidan en precio, ubicación y tipo
    let relatedProperties = await Property.find({
      "operations.prices.price": { $gte: minPrice, $lte: maxPrice },
      "location.name": currentLocation,
      "type.name": currentType,
      id: { $ne: currentProperty.id } // Excluir la propiedad actual
    }).lean();

    // 4. Si no encontramos propiedades, relajamos los criterios progresivamente
    if (relatedProperties.length === 0) {
      // Buscar solo por precio y tipo
      relatedProperties = await Property.find({
        "operations.prices.price": { $gte: minPrice, $lte: maxPrice },
        "type.name": currentType,
        id: { $ne: currentProperty.id }
      }).lean();
    }

    // 5. Si aún no hay resultados, relajamos aún más, buscando solo por precio
    if (relatedProperties.length === 0) {
      relatedProperties = await Property.find({
        "operations.prices.price": { $gte: minPrice, $lte: maxPrice },
        id: { $ne: currentProperty.id }
      }).lean();
    }

    // 6. Aplicar "puntuación" de coincidencia (cuantos más criterios coinciden, mayor es la puntuación)
    relatedProperties = relatedProperties.map((property) => {
      let score = 0;
      if (property.type.name === currentType) score += 2; // Coincidencia de tipo tiene más peso
      if (property.location.name === currentLocation) score += 1; // Coincidencia de ubicación
      return { ...property, score };
    });

    // 7. Ordenar las propiedades por la puntuación de coincidencia
    relatedProperties.sort((a, b) => b.score - a.score);

    // 8. Limitar el número de propiedades a devolver (por ejemplo, 5 propiedades)
    const maxResults = 5;
    const topRelatedProperties = relatedProperties.slice(0, maxResults);

    // 9. Enviar el resultado de las propiedades relacionadas
    res.status(200).json(topRelatedProperties);
  } catch (error) {
    console.error('Error al obtener propiedades relacionadas:', error);
    res.status(500).json({ message: 'Error al obtener propiedades relacionadas', error });
  }
};

const getNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = await PropertyManager.aggregate([
      {
        $group: {
          _id: "$location.city",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]).lean(); // Usamos lean()

    res.status(200).json(neighborhoods);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vecindarios', error });
  }
};

const getFavorites = async (req, res) => {
  try {
    const { list } = req.query;
    const ids = list.split(',').map(id => parseInt(id, 10));

    const properties = await PropertyManager.read({ id: { $in: ids } }).lean(); // Usamos lean()

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener propiedades favoritas', error });
  }
};



const getAllPropertyIds = async (req, res) => {
  try {
    const properties = await PropertyManager.read({}, { id: 1 }).lean(); // Usamos lean()

    const ids = properties.map(property => property.id);

    res.status(200).json(ids);
  } catch (error) {
    console.error('Error al obtener los IDs de las propiedades:', error);
    res.status(500).json({ message: 'Error al obtener los IDs de las propiedades', error });
  }
};


const autocompleteProperties = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    // Cargar el archivo JSON
    const filePath = path.join(process.cwd(), 'direcciones_y_barrios.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const properties = JSON.parse(jsonData);

    // Configuración de Fuse.js
    const options = {
      keys: ['value'], // Solo buscamos en el campo 'value'
      threshold: 0.3,  // Nivel de coincidencia para errores tipográficos
    };

    // Inicializa Fuse.js con los datos del archivo JSON
    const fuse = new Fuse(properties, options);

    // Realiza la búsqueda difusa
    const results = fuse.search(query);

    // Mapea los resultados a la estructura que necesitas para la respuesta
    const response = results.map(({ item }) => ({
      value: item.value,
      secundvalue: item.secundvalue || ''  // Si no tiene secundvalue, dejamos vacío
    }));

    res.json(response);
  } catch (error) {
    console.error('Error en autocompletado con Fuse.js:', error);
    res.status(500).json({ message: 'Error en autocompletado con Fuse.js', error });
  }
};



export {
  createProperty,
  getProperties,
  getPropertyById,
  getRelatedProperties,
  getNeighborhoods,
  getFavorites,
  getAllPropertyIds,
  getpropertyById,
  autocompleteProperties,
  getPropertyLocations,
};
