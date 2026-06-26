import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'categoryTags',
  title: 'Danh Sách Tags',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
    }),
  ],
})
