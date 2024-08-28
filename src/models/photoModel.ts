export interface Photo {
  id: number;
  author: string;
  title: string;
  date: Date;
  src: string;
  weight: string;
  age: Number;
  totalAccess: Number;
  totalComments: Number;
}

export let photos: Photo[] = [
  {
    id: 1,
    author: 'John Doe',
    title: '',
    date: new Date(),
    src: '',
    weight: '',
    age: 10,
    totalAccess: 100,
    totalComments: 2,
  },
  {
    id: 2,
    author: 'John Doe 2',
    title: '',
    date: new Date(),
    src: '',
    weight: '',
    age: 10,
    totalAccess: 100,
    totalComments: 2,
  },
];
