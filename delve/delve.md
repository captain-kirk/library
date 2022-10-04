# Getting Started

## Install

```
go install github.com/go-delve/delve/cmd/dlv@latest
```

## Usage

```
dlv debug     # Start program
r <args>      # Run with arguments
br file:line  # Set breakpoint in file at line
c             # Continue
quit          # Quit
```

## Testing w/ User Input

In one terminal:
```
dlv --headless debug
```

Output will look like
```
API server listening at: 127.0.0.1:xyz
```

In another terminal:
```
dlv connect:xyz
```
Answer input in first terminal
