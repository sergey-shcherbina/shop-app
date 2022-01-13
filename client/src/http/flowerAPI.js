import {$authHost, $host} from "."

export const createGroup = async (group) => {
  const {data} = await $authHost.post("api/group", group)
  return data
}
export const fetchGroups = async () => {
  const {data} = await $host.get("api/group")
  return data
}
export const removeGroup = async (id) => {
  const {data} = await $authHost.delete("api/group/" + id)
  return data 
}
export const createFlower = async (flower) => {
  const {data} = await $authHost.post("api/flower", flower)
  return data
}
export const editFlower = async (id, flower) => {
  const {data} = await $authHost.put("api/flower/" + id, flower)
  return data
}
export const fetchFlowers = async (groupId) => {
  const {data} = await $host.get("api/flower", {params: {groupId}})
  return data
}
export const removeFlower = async (id) => {
  const {data} = await $authHost.delete("api/flower" + id)
  return data 
}
export const createImage = async (image) => {
  const {data} = await $authHost.post("api/image", image)
  return data
}
export const fetchImages = async (flowerId, order) => {
  const {data} = await $host.get("api/image", {params: {flowerId, order}})
  return data
}
export const removeImage = async (id) => {
  const {data} = await $authHost.delete("api/image" + id)
  return data 
}
export const createPhoto = async (photo) => {
  const {data} = await $authHost.post("api/photo", photo)
  return data
}
export const fetchPhotos = async (order) => {
  const {data} = await $host.get("api/photo", {params: {order}})
  return data
}
export const removePhoto = async (id) => {
  const {data} = await $authHost.delete("api/photo" + id)
  return data 
}