currentPane=$(tmux display-message -p '#P')
newPane=$(($currentPane + 1))
tmux split-window -v
tmux select-pane -t "$currentPane"
tmux send-keys -t "$newPane" C-z 'pwd' Enter