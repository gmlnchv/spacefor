import type { Config } from 'tailwindcss';
import sharedConfig from 'tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('@tailwindcss/typography')],
  presets: [sharedConfig],
};

export default config;
