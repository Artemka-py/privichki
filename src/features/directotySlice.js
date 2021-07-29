import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./directotyAPI";

const initialState = {
  content: [],
  loading: false,
};

export const selectDirectorys = (state) => state.directorys;

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }

    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }

    return node;
  });
}

function transformData(data) {
  let newData = [];
  data.map((val) => {
    if (val.children !== undefined) {
      newData.push({
        title: val.title,
        key: val.id,
        children: [],
      });
    } else {
      newData.push({
        title: val.title,
        key: val.id,
        isLeaf: true,
      });
    }
  });

  return newData;
}

export const fetchDataAsync = createAsyncThunk(
  "directory/fetchData",
  async (dirId, { getState }) => {
    const res = await fetchData(dirId);
    if (dirId === undefined) return transformData(res.children);
    const curValue = selectDirectorys(getState());

    return updateTreeData(curValue.content, dirId, transformData(res.children));
  },
);

export const directotySlice = createSlice({
  name: "directoty",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      });
  },
});

export default directotySlice.reducer;
