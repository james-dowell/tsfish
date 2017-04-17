var nodeResolve = require('rollup-plugin-node-resolve');
import commonjs from 'rollup-plugin-commonjs';
import rollupTypescript from 'rollup-plugin-typescript';
import typescript from 'typescript';

export default {
    entry: 'src/app/index.ts',
    format: 'iife',
    moduleName: 'main',
    onwarn: (error) => {
      // output error in red, then exit the process
      console.error('\x1b[41m', 'ERROR: ', error, '\x1b[0m');
      process.exit(-1);
    },
    plugins: [
        rollupTypescript({
            typescript: typescript
        }),
        // nodeResolve({
        //     jsnext: true,
        //     browser: true,
        //     main: true,
        //     preferBuiltins: false,
        // }),
        commonjs({
            include: 'node_modules/**'
        }),
        // builtins(),
    ]
};
