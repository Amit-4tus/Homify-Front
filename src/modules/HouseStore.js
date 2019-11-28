import houseService from '../services/HouseService'

export default {
    strict: true,
    state: {
        itemsToShow: [],
    },
    getters: {   
        itemsToShow(state) {
            return state.itemsToShow;
        }
    },
    mutations: {
        setItemsToShow(state,  itemsToShow ) {
            state.itemsToShow = itemsToShow.items;
            
        }
    },
    actions: {
        async loadItems(context) {
            const items = await houseService.getItems()
            context.commit({ type: 'setItemsToShow', items })
        },
        async updateHouseImgs(context) {

        }
    },
}

// async updateUser(context, {user}) {
//     //             user = await UserService.update(user);
//     //             context.commit({type: 'setUser', user})
//     //         }