export const SET = 'safe-app/category/SET'

export const setCategory = (category) => ({
  type: SET,
  payload: {category}
})

export default (state = '', action) => {
  const {category} = action.payload || {}

  switch (action.type) {
    case SET:
      return category
    default:
      return state
  }
}