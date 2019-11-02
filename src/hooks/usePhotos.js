import { useEffect, useState } from 'react'
import yelp from '../api/yelp'

export default restId => {
  const [photos, setPhotos] = useState([])

  const getPhotos = async id => {
    try {
      const { data } = await yelp.get(`/${id}`)
      const photos = data.photos
      setPhotos(photos)
    } catch (e) {
      console.error(e)
      console.log('messed up in getPhotos')
    }
  }
  useEffect(() => {
    getPhotos(restId)
    console.log('TCL: photos', photos)
  }, [])
  return { photos, setPhotos }
}
