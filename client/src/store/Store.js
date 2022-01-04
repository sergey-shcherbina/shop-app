import {makeAutoObservable} from "mobx"

export default class Store {
	constructor() {
		this._user = {}
		this._groups = []
		this._flowers = []
		this._images = []
		this._photos = []
		this._selectedGroup = {}
		this._selectedFlower = {}
		this._selectedImage = {}
		this._selectedPhoto = {}
		this._backgr = {}
		makeAutoObservable(this)
	}
  setGroups(groups) {
		this._groups = groups
	}
	setFlowers(flowers) {
		this._flowers = flowers
	}
	setImages(images) {
		this._images = images
	}
	setPhotos(photos) {
		this._photos = photos
	}
	setSelectedGroup(group) {
		this._selectedGroup = group
	}
	setSelectedFlower(flower) {
		this._selectedFlower = flower
	}
	setSelectedImage(image) {
		this._selectedImage = image
	}
	setSelectedPhoto(photo) {
		this._selectedPhoto = photo
	}
	setBackgr(photo) {
		this._backgr = photo
	}
	setUser(user) {
		this._user = user
	}
	get user() {
			return this._user
	} 
  get groups() {
		return this._groups
	}
  get flowers() {
		return this._flowers
	}
  get images() {
		return this._images
	}
	get photos() {
		return this._photos
	}
	get selectedGroup() {
		return this._selectedGroup
	}
	get selectedFlower() {
		return this._selectedFlower
	}
	get selectedImage() {
		return this._selectedImage
	}
	get selectedPhoto() {
		return this._selectedPhoto
	}
	get backgr() {
		return this._backgr
	}
}
	
