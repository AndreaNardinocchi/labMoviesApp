import type { Meta, StoryObj } from '@storybook/react';
import MovieHeader from "../components/headerMovie";
import SampleMovie from "./sampleData";

const meta = {
    title: "Movie Details Page/MovieHeader",
    component: MovieHeader,
} satisfies Meta<typeof MovieHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie
};
Basic.storyName = "Default";

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
}
