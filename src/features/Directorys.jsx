import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDataAsync, selectDirectorys } from './directotySlice'
import { Tree } from 'antd'

const { DirectoryTree } = Tree

const initTreeData = [
  {
    id: 20000,
    title: 'archives',
    children: [],
  },
  {
    id: 30000,
    title: 'books',
    children: [],
  },
  {
    id: 1,
    title: 'empty directory',
    children: [],
  },
  {
    id: 40000,
    title: 'images',
    children: [],
  },
]

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children }
    }

    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) }
    }

    return node
  })
}

export const Directory = () => {
  const directorys = useSelector(selectDirectorys)
  const dispatch = useDispatch()
  // const [treeData, setTreeData] = useState(initTreeData)

  useEffect(() => {
    dispatch(fetchDataAsync())
  }, [])

  async function onLoadData(test) {
    return await dispatch(fetchDataAsync(test.id))

    // return new Promise((resolve) => {
    //   if (children) {
    //     resolve()
    //     return
    //   }

    //   setTimeout(() => {
    //     setTreeData((origin) => {
    //       console.log(origin)
    //       return updateTreeData(origin, key, [
    //         {
    //           title: 'Child Node' + ' ' + key,
    //           key: `${key}-0`,
    //         },
    //         {
    //           title: 'Child Node',
    //           key: `${key}-1`,
    //         },
    //       ])
    //     })
    //     resolve()
    //   }, 1000)
    // })
  }

  return (
    <DirectoryTree
      loadData={onLoadData}
      treeData={directorys.content.children}
    />
  )
}
