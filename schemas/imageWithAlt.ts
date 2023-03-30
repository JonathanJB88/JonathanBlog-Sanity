import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageWithAlt',
  title: 'Image with alt text',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
  ],
})
