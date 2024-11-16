export interface BuildPaths {
	entry: string;
	html: string;
	output: string;
	src: string;
	images: string;
}

export enum BuildMode {
	Production = 'production',
	Development = 'development',
}

export interface BuildOptions {
	port: number;
	paths: BuildPaths;
	mode: BuildMode;
	analyzer?: boolean;
}
