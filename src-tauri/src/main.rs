// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::collections::HashSet;
use std::fmt::format;
use std::fs::{self, File};
use std::io::{self, BufRead};
use std::io::{BufReader, Write};
use std::os::fd::AsFd;
use tauri::AppHandle;
use tauri::Manager;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(app: AppHandle, name: &str) -> String {
    app.emit_all(
        "event-name",
        Payload {
            message: "Tauri is awesome!".into(),
        },
    )
    .unwrap();

    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

#[tauri::command(async)]
fn filecompare(app: AppHandle, path: &str) -> String {
    let mut file_paths = vec![]; // 替换为你的文件路
    for file in fs::read_dir(path).unwrap() {
        let p = file.unwrap().path().to_string_lossy().into_owned();
        file_paths.push(p);
    }

    print!("------------------{}", path);

    let mut intersection: Option<HashSet<String>> = None;
    let max = file_paths.len();

    let mut c = 0;
    for file_path in file_paths {
        c = c + 1;
        println!("Failed to read file: {},:{},{}", c, file_path, max);
        app.emit_all(
            "event-name",
            Payload {
                message: format!("正在处理{}/{}", c, max),
            },
        )
        .unwrap();
        if let Ok(lines) = read_lines(&file_path) {
            let lines: HashSet<String> = lines.filter_map(|line| line.ok()).collect();

            if let Some(existing_intersection) = intersection {
                intersection = Some(
                    existing_intersection
                        .intersection(&lines)
                        .cloned()
                        .collect(),
                );
            } else {
                intersection = Some(lines);
            }
        } else {
            println!("read file: {}", file_path);
        }
    }

    if let Some(result) = intersection {
        println!("Intersection of files:");
        let mut file: File = fs::OpenOptions::new()
            .read(true)
            .write(true)
            .append(true)
            .create(true)
            .open("test.txt")
            .unwrap();

        for line in result {
            file.write_all(&mut format!("{}\r\n", line).as_bytes())
                .unwrap();
        }
        app.emit_all(
            "event-name",
            Payload {
                message: format!("处理完成"),
            },
        );
    }

    fn read_lines(filename: &str) -> io::Result<io::Lines<io::BufReader<File>>> {
        let file = File::open(filename)?;
        Ok(io::BufReader::new(file).lines())
    }
    format!("666666666, {}! You've been greeted from Rust!", path)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, filecompare])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
