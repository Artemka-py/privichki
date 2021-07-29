import axios from 'axios'

export const fetchData = async (dirId) => {
  let url =
    dirId > 0
      ? `http://164.90.161.80:3000/api/content?dirId=${dirId}`
      : `http://164.90.161.80:3000/api/content`
  let data

  await axios
    .get(url)
    .then((response) => {
      console.log(response.data)
      data = response.data
    })
    .catch((err) => console.log(err))

  return data
}
