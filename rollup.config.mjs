import { fileURLToPath } from 'node:url';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'lib/main.ts',
	output: [
		{
			file: './dist/main.js',
			format: 'cjs',
			exports: 'named',
			sourcemap: true
		},
		{
			file: './dist/main.mjs',
			format: 'es',
			exports: 'named',
			sourcemap: true
		}
	],
	external: ['bindings'],
	plugins: [
		cleaner({
			targets: ['./dist']
		}),
		typescript({ tsconfig: fileURLToPath(new URL('lib/tsconfig.json', import.meta.url)) }),
		terser({
			ecma: 2019,
			// This will ensure that whenever Rollup is in watch (dev) mode, console logs will not be removed
			// eslint-disable-next-line @typescript-eslint/naming-convention
			compress: { drop_console: !Reflect.has(process.env, 'ROLLUP_WATCH') },
			format: { comments: false }
		})
	]
};
