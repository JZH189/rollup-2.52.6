## rollup 函数

```JavaScript

function rollup(rawInputOptions: GenericConfigObject): Promise<RollupBuild> {
	return rollupInternal(rawInputOptions, null);
}

```
rollup 方法接收一个 rawInputOptions 参数并且返回了一个 Promise。rawInputOptions 就是一个输入参数对象。rollup内部调用了 rollupInternal 函数。

```JavaScript

async function rollupInternal(
	rawInputOptions: GenericConfigObject,
	watcher: RollupWatcher | null
): Promise<RollupBuild> {
  //格式化输入参数对象
	const { options: inputOptions, unsetOptions: unsetInputOptions } = await getInputOptions(
		rawInputOptions,
		watcher !== null
	);
	//创建图形
	const graph = new Graph(inputOptions, watcher);
	// 创建图形后从内存中删除缓存选项（不再使用缓存）
	const useCache = rawInputOptions.cache !== false;
	delete inputOptions.cache;
	delete rawInputOptions.cache;
  //...

	try {
		await graph.pluginDriver.hookParallel('buildStart', [inputOptions]);
		await graph.build();
	} catch (err) {
		const watchFiles = Object.keys(graph.watchFiles);
		if (watchFiles.length > 0) {
			err.watchFiles = watchFiles;
		}
		await graph.pluginDriver.hookParallel('buildEnd', [err]);
		await graph.pluginDriver.hookParallel('closeBundle', []);
		throw err;
	}

	await graph.pluginDriver.hookParallel('buildEnd', []);

	//...

	const result: RollupBuild = {
		cache: useCache ? graph.getCache() : undefined,
		async close() {
			if (result.closed) return;

			result.closed = true;

			await graph.pluginDriver.hookParallel('closeBundle', []);
		},
		closed: false,
		async generate(rawOutputOptions: OutputOptions) {
			if (result.closed) return error(errAlreadyClosed());

			return handleGenerateWrite(
				false,
				inputOptions,
				unsetInputOptions,
				rawOutputOptions as GenericConfigObject,
				graph
			);
		},
		watchFiles: Object.keys(graph.watchFiles),
		async write(rawOutputOptions: OutputOptions) {
			if (result.closed) return error(errAlreadyClosed());

			return handleGenerateWrite(
				true,
				inputOptions,
				unsetInputOptions,
				rawOutputOptions as GenericConfigObject,
				graph
			);
		}
	};
	if (inputOptions.perf) result.getTimings = getTimings;
	return result;
}

```
rollupInternal 方法

```JavaScript
// options
{
    "acorn": {
        "allowAwaitOutsideFunction": true,
        "ecmaVersion": "latest",
        "preserveParens": false,
        "sourceType": "module"
    },
    "acornInjectPlugins": [],
    "context": "undefined",
    "experimentalCacheExpiry": 10,
    "input": [
        "c:\\Users\\Walmart\\Desktop\\study\\rollup-2.52.6\\example/index.js"
    ],
    "makeAbsoluteExternalsRelative": true,
    "perf": false,
    "plugins": [],
    "preserveEntrySignatures": "strict",
    "preserveSymlinks": false,
    "shimMissingExports": false,
    "strictDeprecations": false,
    "treeshake": {
        "annotations": true,
        "correctVarValueBeforeDeclaration": false,
        "propertyReadSideEffects": true,
        "tryCatchDeoptimization": true,
        "unknownGlobalSideEffects": true
    }
}

// unsetOptions 是一个Set结构
```