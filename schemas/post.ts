import {BookIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType, SlugRule, SlugValidationContext, StringRule} from 'sanity'

import authorType from './author'
import categoryType from './category'
import tagType from './tag'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value: string, context: SlugValidationContext) =>
          context.defaultIsUnique(value, context),
      },
      validation: (rule: SlugRule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: authorType.name}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: categoryType.name}]}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: tagType.name}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
    },
    prepare({title, media, author, date}) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {title, media, subtitle: subtitles.join(' ')}
    },
  },
})
