import counterReducer from '../features/CounterSlice'; // Importa el slice del contador

const rootReducer = combineReducers({
    counter: counterReducer, // Agrega el slice del contador al root reducer
    // Puedes agregar otros reducers aquí si los tienes
});

export default rootReducer;
