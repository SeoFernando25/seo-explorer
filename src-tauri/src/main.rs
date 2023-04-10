#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::vec;

use serde::{ser::SerializeStruct, Serialize};
use tauri::command;

struct FileEntry {
    path: String,
    name: Option<String>,
    children: Option<Vec<FileEntry>>,
}

impl Serialize for FileEntry {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("FileEntry", 3)?;
        state.serialize_field("path", &self.path)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("children", &self.children)?;
        state.end()
    }
}

// args: str, recursive: bool (if true, read all subdirectories, else return empty list)
#[command]
fn read_dir(path: &str, recursive: bool) -> Vec<FileEntry> {
    let result = std::fs::read_dir(path);
    match result {
        Ok(_) => (),
        Err(_) => return vec![],
    }
    return result
        .unwrap()
        .map(|entry| {
            let entry = entry.unwrap();
            let path = entry.path();
            let path_str = path.to_str().unwrap().to_string();
            let name = path.file_name().unwrap().to_str().unwrap().to_string();
            //
            let children = path.is_dir().then(|| {
                if recursive {
                    read_dir(&path_str, true)
                } else {
                    vec![]
                }
            });
            FileEntry {
                path: path_str,
                name: Some(name),
                children,
            }
        })
        .collect();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
