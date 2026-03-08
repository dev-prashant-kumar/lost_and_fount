export type CreateItemInput = {
  title: string
  description: string
  location: string
  type: "LOST" | "FOUND"
  imageUrl?: string
  ownerId: string
}