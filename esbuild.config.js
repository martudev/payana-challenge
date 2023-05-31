(async () => {
	const esbuild = require('esbuild');
	const { sync } = require('glob');

	const start = new Date();

	const files = sync('src/**/*.ts', {
		ignore: [
			'node_modules',
			'**/*.spec.ts',
			'**/*.test.ts',
			'**/*.mock.ts',
			'src/__mocks__/**',
			'dist',
		],
	});

	const result = await esbuild.build({
		entryPoints: files,
		metafile: true,
		platform: 'node',
		target: 'es2020',
		format: 'cjs',
		outdir: 'dist',
		color: true,
	});

	const end = new Date();

	const final = end.getTime() - start.getTime();
	console.log(`Total Build time: ${final}ms`);

	const text = await esbuild.analyzeMetafile(result.metafile, {
		color: true,
	});
	console.log(text);
})();
