import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { deskStructure, singletonPlugin } from './plugins/singleton';
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';

// Schemas
import blockContent from './schemas/blockContent';
import category from './schemas/documents/category';
import contact from './schemas/documents/contact';
import hero from './schemas/objects/hero';
import home from './schemas/documents/home';
import event from './schemas/documents/event';
import link from './schemas/objects/link';
import navigation from './schemas/documents/navigation';
import navigationItem from './schemas/objects/navigation-item';
import page from './schemas/documents/page';
import post from './schemas/documents/post';
import seo from './schemas/objects/seo';
import settings from './schemas/documents/settings';
import space from './schemas/documents/space';
import spaces from './schemas/documents/spaces';
import retailer from './schemas/documents/retailer';
import spacePlan from './schemas/objects/space-plan';
import footer from './schemas/documents/footer';
import testimonial from './schemas/documents/testimonial';
import editorial from './schemas/documents/editorial';
import accordionItem from './schemas/objects/accordion-item';
import accordionList from './schemas/objects/accordion-list';
import callToAction from './schemas/objects/call-to-action';

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
      editorial,
      // Documents
      event,
      footer,
      space,
      page,
      post,
      navigation,
      retailer,
      testimonial,
      // Objects
      accordionItem,
      accordionList,
      blockContent,
      callToAction,
      category,
      hero,
      link,
      navigationItem,
      seo,
      spacePlan,
    ],
  },

  plugins: [
    structureTool({
      structure: deskStructure([
        home,
        spaces,
        contact,
        editorial,
        footer,
        settings,
      ]),
    }),
    singletonPlugin([
      home.name,
      contact.name,
      editorial.name,
      spaces.name,
      footer.name,
      settings.name,
    ]),
    imageHotspotArrayPlugin(),
    visionTool(),
  ],
});
