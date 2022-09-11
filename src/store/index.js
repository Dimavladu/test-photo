import { createStore, createLogger } from 'vuex'
import axios from 'axios'

const plugins = []

if (process.env.NODE_ENV === 'development'){
  plugins.push(createLogger())
}


export default createStore({
  state: {
    files: [],
    activePhotos: [],
    selectedPhoto: null,
    selectedPhotoIdx: 0,
    typeImage: 'xy'
  },
  mutations: {
    getLocalStorageItem(state, type){
      const data = localStorage.getItem(type)
      if (data) state[type] = JSON.parse(data)
    },
    setLocalStoragePhotosItems(state){
      localStorage.setItem('activePhotos', JSON.stringify(state.activePhotos))
      localStorage.setItem('selectedPhotoIdx', JSON.stringify(state.selectedPhotoIdx))
      localStorage.setItem('selectedPhoto', JSON.stringify(state.selectedPhoto))
    },
   
    addFiles(state, [parentId, files]){
      state.files[parentId] = files
    },
    selectPhoto(state, photo){
      state.activePhotos = state.files[photo.parentId].filter(file => file.type === 'jpg')
      state.selectedPhotoIdx = state.activePhotos.indexOf(photo)
      state.selectedPhoto = photo
    },
    nextPhoto(state){
      if(state.selectedPhotoIdx === state.activePhotos.length - 1){
        state.selectedPhotoIdx = 0
        state.selectedPhoto = state.activePhotos[0]
        return
      }
      state.selectedPhotoIdx++
      state.selectedPhoto = state.activePhotos[state.selectedPhotoIdx] 
    },
    prevPhoto(state){
      if(state.selectedPhotoIdx === 0){
        state.selectedPhotoIdx = state.activePhotos.length - 1
        state.selectedPhoto = state.activePhotos[state.activePhotos.length - 1]
        return
      }
      state.selectedPhotoIdx--
      state.selectedPhoto = state.activePhotos[state.selectedPhotoIdx] 
    },
    changeTypeImage(state, type){
      state.typeImage = type
      localStorage.setItem('typeImage', JSON.stringify(state.typeImage))
    },
    
  },
  actions: {
    async loadFilesById({state, commit}, parentId){
      if(state.files[parentId]){
        return state.files[parentId]
      }
      let dataFiles = await axios.get(`https://test-photoz-default-rtdb.firebaseio.com/files/${parentId}.json`)
      if (!dataFiles.data) {
        commit("addFiles", [parentId, dataFiles.data]);
        return []
      }
      dataFiles = Object.values(dataFiles.data).filter(file => file !== null)
      commit("addFiles", [parentId, dataFiles]);
      return dataFiles
    },
  },
  getters: {
    activeFolderId(state){
      return state.selectedFolder?.id || 0
    },
    imgUrl(state){
      return `https://firebasestorage.googleapis.com/v0/b/test-photoz.appspot.com/o/${state.selectedPhoto.parentId}%2F${state.selectedPhoto.name}.jpg?alt=media` || ''
    }
  },
  modules: {
  }
})
