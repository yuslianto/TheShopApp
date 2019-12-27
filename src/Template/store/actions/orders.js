export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cardItems, totalAmount) => {
    return {
        type: ADD_ORDER,
        orderData: { items: cardItems, amount: totalAmount}
    };
};