workflow "build-and-release" {
  on = "push"
  resolves = ["build"]
}

action "build" {
    uses = "actions/checkout@v1"
    runs = "docker run -v ${{ github.workspace }}:/srv/jekyll -v ${{ github.workspace }}/_site:/srv/jekyll/_site jekyll/builder:latest /bin/bash -c \"chmod 777 /srv/jekyll && jekyll build --future\""
}