import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Dự Án',
  type: 'document',
  fields: [
    defineField({
      name: 'filter_name',
      title: 'Filter Name',
      type: 'string',
    }),
    defineField({
      name: 'short_name',
      title: 'Tiêu Đề Ngắn',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Tiêu Đề Đầy Đủ',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Nội Dung',
      type: 'text',
    }),
    defineField({
      name: 'tags',
      title: 'Thẻ Tag',
      type: 'array',
      of: [{type: 'reference', to: {type: 'categoryTags'}}],
    }),
    // defineField({
    //   name: 'tags',
    //   title: 'Thẻ Tag',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'object',
    //       name: 'Tags',
    //       fields: [
    //         {type: 'string', name: 'name'},
    //         {type: 'string', name: 'color'},
    //       ],
    //     },
    //   ],
    //   options: {
    //     layout: 'tags',
    //   },
    // }),
    defineField({
      name: 'image',
      title: 'Hình Ảnh',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Ngày Sản Xuất',
      type: 'string',
    }),
    defineField({
      name: 'tech',
      title: 'Công Nghệ',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Vai Trò',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Trạng Thái',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link Demo',
      type: 'string',
    }),
  ],

  preview: {
    select: {
      title: 'short_name',
      media: 'image',
    },
  },
})
