import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'lib/Vue2FloatPanel.vue',
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
			},
			{
				file: 'dist/index.esm.js',
				format: 'esm',
			},
		],
		plugins: [
			vue(),
			resolve({
				extensions: ['.js', '.vue'],
			}),
			commonjs(),
			babel({
				exclude: 'node_modules/**',
				plugins: ['@babel/external-helpers'],
			}),
		],
		external: ['vue'],
	},
];