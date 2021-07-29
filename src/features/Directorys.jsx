import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataAsync, selectDirectorys } from "./directotySlice";
import { Tree } from "antd";

const { DirectoryTree } = Tree;

export const Directory = () => {
  const directorys = useSelector(selectDirectorys);
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchDataAsync()), []);

  const onLoadData = async ({ key }) => await dispatch(fetchDataAsync(key));

  return (
    <div>
      {directorys.content.length !== 0 ? (
        <DirectoryTree loadData={onLoadData} treeData={directorys.content} />
      ) : (
        "Извините ваша система пуста"
      )}
    </div>
  );
};
