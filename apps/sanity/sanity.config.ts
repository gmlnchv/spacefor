import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { deskStructure, singletonPlugin } from './plugins/singleton'

// Schemas
import author from './schemas/author'
import blockContent from './schemas/blockContent'
import category from './schemas/category'
import contact from './schemas/contact'
import hero from './schemas/hero'
import home from './schemas/home'
import link from './schemas/link'
import navigation from './schemas/navigation'
import navigationItem from './schemas/navigation-item'
import page from './schemas/page'
import post from './schemas/post'
import seo from './schemas/seo'
import settings from './schemas/settings'
import space from './schemas/space'
import spaces from './schemas/spaces'

export default defineConfig({
  name: 'default',
  title: 'Spacefor',

  projectId: 'tt57qu4m',
  dataset: 'production',

  schema: {
    types: [
      // Singletons
      home,
      contact,
      spaces,
      settings,
      // Documents
      space,
      page,
      post,
      navigation,
      // Objects
      author,
      blockContent,
      category,
      hero,
      link,
      navigationItem,
      seo,
    ],
  },

  plugins: [
    structureTool({
      structure: deskStructure([home, contact, spaces, settings]),
    }),
    singletonPlugin([home.name, contact.name, spaces.name, settings.name]),
    visionTool(),
  ],
})
