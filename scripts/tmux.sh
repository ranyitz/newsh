currentPane=$(tmux display-message -p '#P')
newPane=$(($currentPane + 1))
tmux split-window -$SPLIT_DIRECTION
tmux select-pane -t "$currentPane"
tmux send-keys -t "$newPane" C-z "source $CMD" Enter