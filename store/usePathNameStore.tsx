import { create } from 'zustand'

interface PathNameStore {
  pathName: string;
  setPathName: (newPathName:string) => void;
}

const usePathNameStore = create<PathNameStore>((set)=>({
  pathName: '',
  setPathName: (newPathName) => set({
    pathName: newPathName,
  })
}));

export default usePathNameStore