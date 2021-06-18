const initialState = {
    dataCollection: []
}

export default function (state = initialState, actions){
    switch(actions.type) {
        case 'ADD':
            state.dataCollection.push(actions.data);
            state.dataCollection = state.dataCollection.sort(compare)
            return {
                ...state
            };

        default:
            return {
                ...state
            }
    }
}

function compare( a, b ) {
    if ( a.msDate < b.msDate ){
      return -1;
    }
    if ( a.msDate > b.msDate ){
      return 1;
    }
    return 0;
  }