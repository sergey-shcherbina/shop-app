import {makeAutoObservable} from "mobx"

export default class Store {
	constructor() {
		this._user = {}
		this._buyer = {}
		this._groups = []
		this._subGroups = []
		this._flowers = []
		this._images = []
		this._photos = []
		this._basket = []
		this._unProcessedBaskets = []
		this._processedBaskets = []
		this._processedBasket = []
		this._basketBuyer = {}
		this._basketFlowers = []
		this._unProcessedBasketFlowers = []
		this._processedBasketFlowers = []
		this._basketFlower = {}
		this._selectedGroup = {}
		this._selectedSubGroup = {}
		this._selectedFlower = {}
		this._selectedImage = {}
		this._selectedPhoto = {}
		this._backgr = {}
		makeAutoObservable(this)
	}
  setGroups(groups) {
		this._groups = groups
	}
	setSubGroups(subGroups) {
		this._subGroups = subGroups
	}
	setFlowers(flowers) {
		this._flowers = flowers
	}
	setImages(images) {
		this._images = images
	}
	setBasket(flowers) {
		this._basket = flowers
	}
	setUnProcessedBaskets(baskets) {
		this._unProcessedBaskets = baskets
	}
	setProcessedBaskets(baskets) {
		this._processedBaskets = baskets
	}
	setProcessedBasket(basket) {
		this._processedBasket = basket
	}
	setBasketBuyer(basket) {
		this._basketBuyer = basket
	}
	setBasketFlowers(flowers) {
		this._basketFlowers = flowers
	}
	setUnProcessedBasketFlowers(flowers) {
		this._unProcessedBasketFlowers = flowers
	}
	setProcessedBasketFlowers(flowers) {
		this._processedBasketFlowers = flowers
	}
	setBasketFlower(flower) {
		this._basketFlower = flower
	}
	setPhotos(photos) {
		this._photos = photos
	}
	setSelectedGroup(group) {
		this._selectedGroup = group
	}
	setSelectedSubGroup(subGroup) {
		this._selectedSubGroup = subGroup
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
	setUser(user) {
		this._user = user
	}
	setBuyer(buyer) {
		this._buyer = buyer
	}
	setBackgr(photo) {
		this._backgr = photo
	}
	get user() {
		return this._user
	}
	get buyer() {
		return this._buyer
}  
  get groups() {
		return this._groups
	}
	get subGroups() {
		return this._subGroups
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
	get basket() {
		return this._basket
	}
	get unProcessedBaskets() {
		return this._unProcessedBaskets
	}
	get processedBaskets() {
		return this._processedBaskets
	}
	get processedBasket() {
		return this._processedBasket
	}
	get basketBuyer() {
		return this._basketBuyer
	}
	get basketFlowers() {
		return this._basketFlowers
	}
	get unProcessedBasketFlowers() {
		return this._unProcessedBasketFlowers
	}
	get processedBasketFlowers() {
		return this._processedBasketFlowers
	}
	get basketFlower() {
		return this._basketFlower
	}
	get selectedGroup() {
		return this._selectedGroup
	}
	get selectedSubGroup() {
		return this._selectedSubGroup
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
	
