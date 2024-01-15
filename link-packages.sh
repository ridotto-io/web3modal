#!/bin/bash

# Change to the packages directory
cd "$(dirname "$0")/packages" || exit

# Associative array to store package directory names keyed by package names
declare -A all_packages

# Function to safely escape package names
escape_package_name() {
    echo "$1" | sed 's/[^a-zA-Z0-9_]/_/g'
}

# First, link all packages globally and store their names
for dir in */ ; do
    if [ -f "$dir/package.json" ]; then
        package_name=$(node -p "require('./$dir/package.json').name")
        escaped_package_name=$(escape_package_name "$package_name")
        echo "Linking $package_name from $dir"
        ( cd "$dir" && npm link )
        all_packages["$escaped_package_name"]="$dir"
    fi
done

# Function to link dependencies
link_dependencies() {
    local package_dir=$1
    local dependencies=$(node -p "Object.keys(require('./$package_dir/package.json').dependencies || {}).join(' ')")
    for dep in $dependencies; do
        escaped_dep=$(escape_package_name "$dep")
        if [[ -n "${all_packages[$escaped_dep]}" ]]; then
            echo "Linking dependency $dep inside $package_dir"
            ( cd "$package_dir" && npm link "$dep" )
        fi
    done
}

# Link dependencies for each package
for dir in */ ; do
    if [ -f "$dir/package.json" ]; then
        link_dependencies "$dir"
    fi
done
