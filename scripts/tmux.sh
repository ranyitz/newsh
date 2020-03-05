currentPane=$(tmux display-message -p '#P')
newPane=$(($currentPane + 1))
tmux split-window -$__SPLIT_DIRECTION__
tmux select-pane -t "$currentPane"
tmux send-keys -t "$newPane" C-z "cd $__CD__;$__CMD__" Enter