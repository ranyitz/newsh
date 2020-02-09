CMD=""
WD="$PWD"
ARGS="$@"

if [ -d "$1" ]; then
    WD="$1"
    ARGS="${@:2}"
fi

if [ -n "$ARGS" ]; then
    CMD="$ARGS"
fi

currentPane=$(tmux display-message -p '#P')
newPane=$(($currentPane + 1))
tmux split-window -$SPLIT_DIRECTION
tmux select-pane -t "$currentPane"
tmux send-keys -t "$newPane" C-z "cd $WD;$CMD" Enter