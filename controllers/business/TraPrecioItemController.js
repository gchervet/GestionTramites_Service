var TraPrecioItemService = require('../../service/business/TraPrecioItemService');

// TraPrecioItem routes
secureRoutes.get('/TraPrecioItem/GetByPrecioItemByIdPantalla/:idPrecioLista&:idPantalla', TraPrecioItemService.GetByPrecioItemByIdPantalla);