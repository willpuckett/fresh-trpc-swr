import { defineConfig } from '@twind/core@1.1.3'
import presetTailwind from '@twind/preset-tailwind@1.1.4'
import presetAutoprefix from '@twind/preset-autoprefix@1.0.7'

export default {
  ...defineConfig({
    presets: [presetTailwind(), presetAutoprefix()],
  }),
  selfURL: import.meta.url,
}
