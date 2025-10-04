import { defineConfig } from 'velite'

export default defineConfig({
  collections: {
    blogs: {
      name: 'Blog',
      pattern: 'content/blog/**/*.md',
      schema: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        publishedAt: { type: 'date', required: true },
        updatedAt: { type: 'date' },
        tags: { type: 'string', array: true },
        author: { type: 'string' },
        readingTime: { type: 'number' },
        isPublished: { type: 'boolean', default: true },
        image: { type: 'string' },
        content: { type: 'markdown', required: true }
      }
    }
  }
})