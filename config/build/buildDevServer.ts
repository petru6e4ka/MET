import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';
import { DEV_PORT } from './constants/constants';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port ?? DEV_PORT,
		open: true,
		hot: true,
	};
}
