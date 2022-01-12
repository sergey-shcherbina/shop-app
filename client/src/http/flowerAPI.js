import {$authHost, $host} from "."

export const createGroup = async (group) => {
  const {data} = await $authHost.post("group", group)
  return data
}
export const fetchGroups = async () => {
  const {data} = await $host.get("group")
  return data
}
export const removeGroup = async (id) => {
  const {data} = await $authHost.delete("group/" + id)
  return data 
}
export const createFlower = async (flower) => {
  const {data} = await $authHost.post("flower", flower)
  return data
}
export const editFlower = async (id, flower) => {
  const {data} = await $authHost.put("flower/" + id, flower)
  return data
}
export const fetchFlowers = async (groupId) => {
  const {data} = await $host.get("flower", {params: {groupId}})
  return data
}
export const removeFlower = async (id) => {
  const {data} = await $authHost.delete("flower" + id)
  return data 
}
export const createImage = async (image) => {
  const {data} = await $authHost.post("image", image)
  return data
}
export const fetchImages = async (flowerId, order) => {
  const {data} = await $host.get("image", {params: {flowerId, order}})
  return data
}
export const removeImage = async (id) => {
  const {data} = await $authHost.delete("image" + id)
  return data 
}
export const createPhoto = async (photo) => {
  const {data} = await $authHost.post("photo", photo)
  return data
}
export const fetchPhotos = async (order) => {
  const {data} = await $host.get("photo", {params: {order}})
  return data
}
export const removePhoto = async (id) => {
  const {data} = await $authHost.delete("photo" + id)
  return data 
}