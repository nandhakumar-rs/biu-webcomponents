import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'biu-components',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'biu-components',
      proxiesFile: '../biu-components-react/src/components.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
  ],
  plugins: [
    sass()
  ]
};
