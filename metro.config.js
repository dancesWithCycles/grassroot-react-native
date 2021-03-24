/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
    /*by default metro bundler does not compile files with extension .ts or .tsx*/
    resolver:{
	sourceExts:['jsx','js','ts','tsx'],
    },
};
