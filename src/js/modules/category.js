export const SET = 'safe-app/category/SET'

export const setCategory = (category) => ({
  type: SET,
  payload: {category}
})

export default (state = '', {payload = {}, type, ...action}) => {
  const {category} = payload

  switch (type) {
    case SET:
      return category
    default:
      return state
  }
}