import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { DEV_PORT } from './config/build/constants/constants';
import { BuildMode, BuildPaths } from './config/build/types/types';

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    images: path.resolve(__dirname, 'src/assets/images'),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? DEV_PORT,
    mode: env.mode ?? BuildMode.Development,
    paths,
    analyzer: env.analyzer,
  });

  return config;
};
