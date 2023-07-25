import { useControls, button, folder } from "leva";

export function useControlsWithReset(folderName, fields) {
  const resetValues = {};
  for (const key in fields) {
    const field = fields[key];
    if (typeof field === "object") {
      resetValues[key] = field.value;
    } else {
      resetValues[key] = field;
    }
  }

  const [_fields, reset] = useControls(folderName, () => ({
    ...fields,
    [`Reset ${folderName}`]: button(() => {
      reset(resetValues);
    }),
  }));
  console.log(_fields);

  return _fields;
}
function resetValueGetter(subFolderList) {
  const resetValueList = {};
  subFolderList.forEach((subFolder) => {
    for (const key in subFolder) {
      const field = subFolder[key];
      if (typeof field === "object") {
        resetValueList[key] = field.value;
      } else {
        resetValueList[key] = field;
      }
    }
  });
  return resetValueList;
}

export function useGroupControlsWithReset(folderName, subFolders) {
  const [fields, resetter] = useControls(folderName, () => {
    const controlList = {};
    const subFolderList = [];
    for (const subfolderName in subFolders) {
      const controlFactory = (subFolder, subFolderName) => {
        const resetValues = resetValueGetter([subFolder]);
        const control = {
          ...subFolder,
          [`Reset ${subFolderName}`]: button(() => {
            resetter(resetValues);
          }),
        };
        return control;
      };
      subFolderList.push(subFolders[subfolderName]);
      const control = controlFactory(subFolders[subfolderName], subfolderName);
      controlList[subfolderName] = folder(control);
    }
    console.log("list->", controlList);

    controlList["Reset All Parts"] = button(() => {
      resetter(resetValueGetter(subFolderList));
      console.log(typeof resetter);
    });

    return controlList;
  });

  return fields;
}
