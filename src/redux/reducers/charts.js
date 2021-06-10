const initialState = {
    requestUrl: null,
    noDataAvaialble: true,
    data: {}
}

export default function (state = initialState, actions){
    switch(actions.type) {
        case 'UPDATE_CHART':
            return {
                ...state, 
                noDataAvaialble: false,
                data: actions.charts
            };
            

        default:
            return {
                ...state
            }
    }
}