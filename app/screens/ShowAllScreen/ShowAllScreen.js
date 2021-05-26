import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";

import ButtonIcon from "../../components/ButtonIcon";
import { ListItemSeparator } from "../../components/lists";
import Screen from "../../components/Screen";
import TextIcon from "../../components/TextIcon";
import NettText from "../../components/Text";
import TopBar from "../../components/TopBar";

import styles from "./styles";

function ShowAllScreen({ icon, items, renderItem, title }) {
	const [itemList, setItemList] = useState(items);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		setItemList(items);
	}, [items]);

	return (
		<Screen>
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<TextIcon
					containerStyle={styles.titleContainer}
					icon={icon}
					text={title}
					fontSize={20}
					style={styles.title}
				/>
			</TopBar>
			<FlatList
				style={{ flex: 1 }}
				data={itemList}
				showsVerticalScrollIndicator={false}
				keyExtractor={(_, index) => String(index)}
				renderItem={({ item }) => renderItem(item)}
				refreshing={refreshing}
				onRefresh={() => setItemList(items)}
				ListEmptyComponent={<NettText>Empty list</NettText>} //* Here
				ItemSeparatorComponent={ListItemSeparator}
			/>
		</Screen>
	);
}

export default ShowAllScreen;
